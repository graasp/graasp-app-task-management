/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';
import { TagCloud } from 'react-tagcloud';
import Typography from '@material-ui/core/Typography';
import { ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { CONTAINER_HEIGHT } from '../../config/constants';

const useStyles = makeStyles(() => ({
  typography: { textAlign: 'center' },
}));

const MyCloud = ({ sentence }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const data = [];
  sentence.map((word) => data.push(word));



  const customRenderer = (tag, size, color) => (
    <span
      key={tag}
      style={{
        animation: 'blinker 3s linear infinite',
        animationDelay: `${Math.random() * 2}s`,
        fontSize: `${size / 2}em`,
        border: `2px solid ${color}`,
        margin: '3px',
        padding: '3px',
        display: 'inline-block',
        color: 'black',
      }}
    >
      {tag}
    </span>
  );

  return (
    // <TagCloud
    //   style={{
    //     fontFamily: 'sans-serif',
    //     fontSize: 30,
    //     fontWeight: 'bold',
    //     fontStyle: 'italic',
    //     padding: 5,
    //   }}
    //   minSize={12}
    //   maxSize={35}
    //   tags={data}
    // >
    //   <div style={{ fontSize: 50 }}>react</div>
    //   <div style={{ color: 'green' }}>tag</div>
    //   <div rotate={90}>cloud</div>
    //   hello hey
    // </TagCloud>
    <>
      <Typography variant="h6" className={classes.typography}>
        {t(`Keywords`)}
      </Typography>
      <ResponsiveContainer width="95%" height={CONTAINER_HEIGHT}>
        <TagCloud
          tags={data}
          minSize={1}
          maxSize={5}
          renderer={customRenderer}
        />
      </ResponsiveContainer>
    </>
  );
};

export default MyCloud;
