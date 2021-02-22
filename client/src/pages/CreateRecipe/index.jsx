import React from 'react';
import {
  makeStyles,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';

import Step1 from './Step1/Step1';
import Step2 from './Step2/Step2';
import Step3 from './Step3/Step3';

import styles from './index.module.scss';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     backgroundColor: 'blue',
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     flexBasis: '33.33%',
//     flexShrink: 0,
//   },
//   secondaryHeading: {
//     fontSize: theme.typography.pxToRem(15),
//     color: theme.palette.text.secondary,
//   },
// }));

const CreateRecipe = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={styles.root}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          className={styles.accordionHeader}
          aria-controls='panel1bh-content'
          id='panel1bh-header'
        >
          <Typography className={styles.heading}>
            1. Name, portions, time, picture
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Step1 />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary
          className={styles.accordionHeader}
          aria-controls='panel2bh-content'
          id='panel2bh-header'
        >
          <Typography className={styles.heading}>2. Ingredients</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Step2 />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary
          className={styles.accordionHeader}
          aria-controls='panel3bh-content'
          id='panel3bh-header'
        >
          <Typography className={styles.heading}>3. Instructions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Step3 />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CreateRecipe;
