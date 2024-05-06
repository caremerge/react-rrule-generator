import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DateTime from 'react-datetime';
import 'moment/min/locales';

import { DATE_TIME_FORMAT } from '../../constants/index';
import translateLabel from '../../utils/translateLabel';

const EndOnDate = ({
  id,
  onDate: {
    date,
    options,
  },
  handleChange,
  translations,
  disabled,
}) => {
  const CustomCalendar = options.calendarComponent;  
  const locale = 'en-us';
  const calendarAttributes = {
    'aria-label': translateLabel(translations, 'end.tooltip'),
    value: date,
    dateFormat: DATE_TIME_FORMAT,
    locale,
    readOnly: true,
  };
  let inputAttributes = {
    id: `${id}-datetime`,
      name: 'end.onDate.date',
      readOnly: true,     
  };
  if(disabled){
    inputAttributes = {
      id: `${id}-datetime`,
        name: 'end.onDate.date',
        readOnly: true,     
        disabled: true,
    };
  }
  return (
    <div className="col-6 col-sm-3">
      {
        CustomCalendar
          ? <CustomCalendar
            key={`${id}-calendar`}
            {...calendarAttributes}
            onChange={(event) => {
              const editedEvent = {
                target: {
                  value: event.target.value,
                  name: 'end.onDate.date',
                },
              };

              handleChange(editedEvent);
            }}
          />
          : <DateTime
            {...calendarAttributes}
            inputProps={inputAttributes}
            locale="en-us"
            timeFormat={false}
            viewMode="days"
            closeOnSelect
            closeOnTab
            required
            onChange={(inputDate) => {
              const editedEvent = {
                target: {
                  value: moment(inputDate).format(DATE_TIME_FORMAT),
                  name: 'end.onDate.date',
                },
              };

              handleChange(editedEvent);
            }}
          />
      }
    </div>
  );
};

EndOnDate.propTypes = {
  id: PropTypes.string.isRequired,
  onDate: PropTypes.shape({
    date: PropTypes.string.isRequired,
    options: PropTypes.shape({
      weekStartsOnSunday: PropTypes.bool,
      calendarComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    }).isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default EndOnDate;
