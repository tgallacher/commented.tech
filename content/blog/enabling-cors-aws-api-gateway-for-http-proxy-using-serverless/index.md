---
title: Enabling CORS AWS API Gateway for an HTTP Proxy Integration using Serverless
date: '2019-09-05'
labels: api gateway, cloudsearch, aws, serverless
hero:
  img: './hero.jpg'
  credit: Photo by <a href="https://unsplash.com/@rocua18">Rodolfo Cuadros</a> on <a href="https://unsplash.com/">Unsplash</a>
---

AWS's API Gateway (APIG) is a powerful weapon in your distributed architectural toolkit. However, as powerful as it is, it can often be challenging to either harness its full power, or even get common use cases up and running quickly. In my opinion, these are both largely due to the fact that:

1. The APIG is _highly_ configurable, as it can support a whole bunch of use cases, and so can be difficult to know where to start; and
1. The AWS documentation is vast, generally thorough, and often difficult to follow as it's fragmented across many pages/sections.

Here, we'll try and show some of the power AWS's API Gateway can offer, as an HTTP frontend to your distributed setup, and we'll also cover some of its key features by demoing how you can configure an API Gateway as an ingress point for an example backend integration.

APIG can sit in front of a lot of different backend "_integrations_", and these result in different configuration [types](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apitgateway-method-integration.html#cfn-apigateway-method-integration-type). Here, we will use the _HTTP proxy_ integration type, using the popular AWS CloudSearch service as the backend.

If you want to dive deeper on more around the different integration types that can be configured and how they are different, then [A Detailed Overview of AWS API Gateway](https://www.alexdebrie.com/posts/api-gateway-elements/#roadmap-the-three-basic-parts) by Alex Debrie is an excellent read.

## AWS CloudSearch

[AWS CloudSearch](https://aws.amazon.com/cloudsearch/) is a cloud-managed search solution, much like the popular open source tool, [ElasticSerach](https://www.elastic.co). With some simple configuration, CloudSearch provides a cost-effective solution for searching a large document base, that is globally available. One large downfall, however, is the configuration doesn't allow for configuring the custom headers returned from the API. This makes it impossible to use directly from the client, as you will hit [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) restrictions.

To enable CORS support, and to search our document store from a client app, we need to add the required CORS HTTP headers for both `HTTP GET` and `HTTP OPTIONS`requests:

1. `Access-Control-Allow-Headers`
1. `Access-Control-Allow-Methods`
1. `Access-Control-Allow-Origin`

Neither of this is possible using CloudSearch (at the time of writing, anyway), so we need APIG to save us from having to set up and deploy/manage a backend proxy--such as a AWS Lambda.

## Serverless setup

> Note: While the code examples focus on a Serverless config, the API Gateway customisation relies on the native AWS CloudFormation API and so this can easily be added to a CloudFormation setup all the same.

As we are using the [Serverless framework](https://serverless.com) to configure and manage our serverless setup, our API Gateway customisation will live in our `serverless.yml` file.

We'll begin by assuming a basic Serverless setup, which defines a function with AWS as the provider.

```yaml
# serverless.yml
provider:
  name: aws
  runtime: nodejs8.10
  region: ${opt:region, env:region}
  stage: ${opt:stage, 'dev'}

functions:
  foo:
    handler: functions/foo.bar
    events:
      - http:
          path: /bar/
          method: get
```

Once deployed, this will give us an endpoint, `GET /bar/` on an auto generated AWS endpoint. The generated AWS domain actually points to an API Gateway, which is configured to pass all GET requests for `/bar/` to our above function handler.

With this configuration, we'll then imagine we want to reuse the same API Gateway configured indirectly in our setup above and configure it to also act as a proxy to our CloudSearch setup. Crucially, however, the proxy should be configured to auto inject the required HTTP headers in the HTTP response, back to the client, so that our CloudSearch endpoint happily allows CORS requests.

## Configuring CORS for our API Gateway

Our Serverless config will also allow us to configure and manage other AWS resources using native CloudFormation; all such config lives under the `resources.Resources` node.

The first thing we need to do is to add a proxy endpoint to the auto-generated API Gateway from above. We can do this using the AWS CloudFormation `AWS::ApiGateway::Resource` API:

```yaml
# serverless.yml
provider: ...

functions: ...

resources:
  Resources:
    ProxyResource:
      Type: AWS::ApiGateway::Resource
      Properties:
        ParentId:
          Fn::GetAtt:
            - ApiGatewayRestApi # our default Rest API logical ID
            - RootResourceId
        # the API endpoint that acts as the proxy
        PathPart: search
        RestApiId:
          Ref: ApiGatewayRestApi
```

With the above config, our default API Gateway will now have a new HTTP path, `/search` which will proxy incoming requests upstream to the configured backend (to follow); eventually, this will be our CloudSearch API.

The next step, is to configure the proxy endpoint to auto inject our CORS headers as the request makes its way through the [API Gateway process](https://www.alexdebrie.com/posts/api-gateway-elements/#roadmap-the-three-basic-parts). We configure this behaviour using the `AWS::ApiGateway::Method` CloudFormation API:

```yaml
# serverless.yml
provider: ...

functions: ...

resources:
  Resources:
    ProxyResource: ...

    ProxyMethod:
      Type: AWS::ApiGateway::Method
      Properties:
        AuthorizationType: NONE
        ResourceId:
          Ref: ProxyResource
        RestApiId:
          Ref: ApiGatewayRestApi
        # See item (2) below
        HttpMethod: GET # the HTTP verb of the upstream backend API that will be proxied
        # See item (1) below
        RequestParameters:
          method.request.querystring.q: true
        MethodResponses:
          - StatusCode: 200
            ResponseParameters:
              # Indicate the following are not required params
              method.response.header.Access-Control-Allow-Headers: false
              method.response.header.Access-Control-Allow-Methods: false
              method.response.header.Access-Control-Allow-Origin: false
        Integration:
          IntegrationHttpMethod: GET
          # See item (3) below
          Type: HTTP
          # See item (3) below
          Uri: <YOUR CloudSearch URL>
          RequestParameters:
            # Safely pass the `q` query param through to the backend integration
            integration.request.querystring.q: 'method.request.querystring.q'
          IntegrationResponses:
            - StatusCode: 200
              # See item (4) below
              ResponseParameters:
                method.response.header.Access-Control-Allow-Headers: "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
                method.response.header.Access-Control-Allow-Methods: "'GET,OPTIONS'"
                # Ideally, we would put our client app TLD here for extra security
                method.response.header.Access-Control-Allow-Origin: "'*'"
              ResponseTemplates:
                application/json: ''
```

With this, we are doing a few things all at once:

1. whitelisting the `q` query parameter for incoming requests, so that this parameter is automatically passed through to the (CloudSearch) upstream API;
1. respond to incoming GET requests, and will proxy this to a GET request to the upstream URL;
1. switch on API Gateway's response "_transformer_", which will allow us to modify the response from the upstream (CloudSearch) API before it is given back to the client;
1. add additional HTTP CORS headers to the response, for all HTTP 200 responses from the upstream API.

Combined, our `/search` endpoint should correctly proxy GET requests to our upstream (CloudSearch) API, with a response which satisfies CORS requirements. However, there is still one piece of the puzzle missing; the HTTP OPTIONS preflight request. To configure the HTTP OPTIONS request we can add a "_Mock_" endpoint, as our upstream CloudSearch API won't respond to a HTTP OPTIONS request correctly. This is pretty simple to configure on API Gateway:

```yaml
# serverless.yml
provider: ...

functions: ...

resources:
  Resources:
    ProxyResource: ...

    ProxyMethod: ...

    # Enable Preflight requests (CORS)
    OptionsMethod:
      Type: AWS::ApiGateway::Method
      Properties:
        AuthorizationType: NONE
        ResourceId:
          Ref: ProxyResource
        RestApiId:
          Ref: ApiGatewayRestApi
        HttpMethod: OPTIONS
        Integration:
          IntegrationResponses:
            - StatusCode: 200
              ResponseParameters:
                method.response.header.Access-Control-Allow-Headers: "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
                method.response.header.Access-Control-Allow-Methods: "'GET,OPTIONS'"
                method.response.header.Access-Control-Allow-Origin: "'*'"
              ResponseTemplates:
                application/json: ''
          PassthroughBehavior: WHEN_NO_MATCH
          RequestTemplates:
            application/json: '{"statusCode": 200}'
          Type: MOCK
        MethodResponses:
          - StatusCode: 200
            ResponseModels:
              application/json: 'Empty'
            ResponseParameters:
              # Indicate the following are not required params
              method.response.header.Access-Control-Allow-Headers: false
              method.response.header.Access-Control-Allow-Methods: false
              method.response.header.Access-Control-Allow-Origin: false
```

The above config almost replicates our HTTP GET config, with the key difference being now that the configured `AWS::ApiGateway::Method` is a mocked endpoint: An endpoint which API Gateway will handle entirely for both receiving a request and returning a response.

## Full Example

The full config should look something like:

```yaml
# serverless.yml
provider:
  name: aws
  runtime: nodejs8.10
  region: ${opt:region, env:region}
  stage: ${opt:stage, 'dev'}

functions:
  foo:
    handler: functions/foo.bar
    events:
      - http:
          path: /bar/
          method: get

resources:
  Resources:
    ProxyResource:
      Type: AWS::ApiGateway::Resource
      Properties:
        ParentId:
          Fn::GetAtt:
            - ApiGatewayRestApi # our default Rest API logical ID
            - RootResourceId
        # the API endpoint that acts as the proxy
        PathPart: search
        RestApiId:
          Ref: ApiGatewayRestApi

    ProxyMethod:
      Type: AWS::ApiGateway::Method
      Properties:
        AuthorizationType: NONE
        ResourceId:
          Ref: ProxyResource
        RestApiId:
          Ref: ApiGatewayRestApi
        # See item (2) below
        HttpMethod: GET # the HTTP verb of the upstream backend API that will be proxied
        # See item (1) below
        RequestParameters:
          method.request.querystring.q: true
        MethodResponses:
          - StatusCode: 200
            ResponseParameters:
              # Indicate the following are not required params
              method.response.header.Access-Control-Allow-Headers: false
              method.response.header.Access-Control-Allow-Methods: false
              method.response.header.Access-Control-Allow-Origin: false
        Integration:
          IntegrationHttpMethod: GET
          # See item (3) below
          Type: HTTP
          # See item (3) below
          Uri: <YOUR CloudSearch URL>
          RequestParameters:
            # Safely pass the `q` query param through to the backend integration
            integration.request.querystring.q: 'method.request.querystring.q'
          IntegrationResponses:
            - StatusCode: 200
              # See item (4) below
              ResponseParameters:
                method.response.header.Access-Control-Allow-Headers: "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
                method.response.header.Access-Control-Allow-Methods: "'GET,OPTIONS'"
                # Ideally, we would put our client app TLD here for extra security
                method.response.header.Access-Control-Allow-Origin: "'*'"
              ResponseTemplates:
                application/json: ''

    # Enable Preflight requests (CORS)
    OptionsMethod:
      Type: AWS::ApiGateway::Method
      Properties:
        AuthorizationType: NONE
        ResourceId:
          Ref: ProxyResource
        RestApiId:
          Ref: ApiGatewayRestApi
        HttpMethod: OPTIONS
        Integration:
          IntegrationResponses:
            - StatusCode: 200
              ResponseParameters:
                method.response.header.Access-Control-Allow-Headers: "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
                method.response.header.Access-Control-Allow-Methods: "'GET,OPTIONS'"
                method.response.header.Access-Control-Allow-Origin: "'*'"
              ResponseTemplates:
                application/json: ''
          PassthroughBehavior: WHEN_NO_MATCH
          RequestTemplates:
            application/json: '{"statusCode": 200}'
          Type: MOCK
        MethodResponses:
          - StatusCode: 200
            ResponseModels:
              application/json: 'Empty'
            ResponseParameters:
              # Indicate the following are not required params
              method.response.header.Access-Control-Allow-Headers: false
              method.response.header.Access-Control-Allow-Methods: false
              method.response.header.Access-Control-Allow-Origin: false
```

## Conclusion

AWS's API Gateway is a powerful tool to have in your utility belt when living in a distributed (micro-) service world. It is a versatile HTTP frontend, with the ability to simplify and unify a vast range of disparate backend systems, whilst also being able to tie them all together under a single declaratively configured--and cloud managed--service; with the potential to do so all under a single custom top-level domain (_maybe a future article_).

The only negative, however, is to get some of these savings and/or benefits can be challenging, as it's greatest benefit is also it's greatest weakness: its flexibility.

Hopefully, however, this article added some insight into this magic world and will let you try this out for yourself.
