import React from 'react';
import styled from '@emotion/styled';
import { space, color, typography } from 'styled-system';
import moment from 'moment';

const Section = styled.section`
  ${space}
  ${color}
`;

const P = styled.p`
  ${space}
  font-size: .85em;
  font-family: monospace;
`;

const Changelog = ({ commits = [] }) => (
  <Section mt={5}>
    <h4>Changelog</h4>

    {commits.map(({ hash, date, message }) => (
      <P m={0} key={hash}>
        {moment(date).format('ddd Do MMM, YYYY')} - {message}
      </P>
    ))}
  </Section>
);

export default Changelog;
