/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
import moment from 'moment';

const Changelog = ({ commits = [] }) => (
  <section sx={{ mt: 5 }}>
    <h4>Changelog</h4>

    {commits.map(({ hash, date, message }) => (
      <Styled.p sx={{ m: 0, fontSize: 2, fontFamily: 'monospace' }} key={hash}>
        {moment(date).format('Do MMM YYYY')} -- {message}
      </Styled.p>
    ))}
  </section>
);

export default Changelog;
