import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { Paper } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import { CuisineData, DietData, TypeData } from './FilterData';
import styles from './BrowseRecipe.module.scss';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Filter = ({ handleToggle, checked }) => {
  return (
    <Paper className={styles.filterPaper}>
      <h3>Filter search</h3>
      <Accordion className={styles.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Type</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <List>
              {TypeData.map((value, index) => {
                const labelId = `checkbox-list-label-${value.value}`;
                return (
                  <ListItem
                    key={index}
                    role={undefined}
                    dense
                    button
                    onClick={handleToggle(value)}
                    className={styles.eachListItems}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge='start'
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        className={styles.eachListItemsCheckbox}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={value.title} />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion className={styles.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography>Cuisine</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <List>
              {CuisineData.map((value, index) => {
                const labelId = `checkbox-list-label-${value.value}`;

                return (
                  <ListItem
                    key={index}
                    role={undefined}
                    dense
                    button
                    onClick={handleToggle(value)}
                    className={styles.eachListItems}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge='start'
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        className={styles.eachListItemsCheckbox}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={value.title} />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion className={styles.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography>Diet</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <List>
              {DietData.map((value, index) => {
                const labelId = `checkbox-list-label-${value.value}`;

                return (
                  <ListItem
                    key={index}
                    role={undefined}
                    dense
                    button
                    onClick={handleToggle(value)}
                    className={styles.eachListItems}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge='start'
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        className={styles.eachListItemsCheckbox}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={value.title} />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default Filter;
