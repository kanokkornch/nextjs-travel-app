import React, { useEffect, useState } from 'react';
import Navbar from '../src/Navbar'
import AttractionCard from '../src/AttractionCard'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AboutMe from '../src/AboutMe'
import Education from '../src/Education'
import Projects from '../src/Projects'
import Careers from '../src/Careers'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: '1100'
  },
}));
function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });


  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function HomePage(props, { data }) {
  useEffect(() => {
    let lastKnownScrollPosition = 0
    const element = document.getElementById('app-bar');
    document.addEventListener('scroll', function (e) {
      lastKnownScrollPosition = window.scrollY;
      if (lastKnownScrollPosition === 0) {
        element.classList.add('top');
      } else {
        element.classList.remove('top');
      }
    })
  })
  return <div>
    <div className="app-bg overlay">
      <div className="background"></div>
    </div>
    <div id="back-to-top-anchor"></div>
    <Container maxWidth="xl" className='px-4 px-sm-5'>
      <Navbar />
        <AboutMe />
        <Education />
        <Projects />
        <Careers />
      {/* <div style={{marginTop: '1em'}}>
        <Typography variant="h4" color="primary" gutterBottom>
          Around the world
        </Typography>
        <Grid container spacing={1}>
          {data.map((attraction) => (
            <Grid item xs={12} lg={4} key={attraction.id}>
              <AttractionCard attraction={attraction} />
            </Grid>
          ))}
        </Grid>
      </div> */}
    </Container >
    <ScrollTop {...props}>
      <Fab color="secondary" size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollTop>
  </div>
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get data
  const res = await fetch('https://www.mecallapi.com/api/attractions')
  const data = await res.json()

  // By returning { props: { data } }, the HomePage component
  // will receive `data` as a prop at build time
  return {
    props: { data },
  }
}

export default HomePage