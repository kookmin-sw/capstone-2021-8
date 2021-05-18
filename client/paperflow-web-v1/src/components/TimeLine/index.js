import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './customVerticalTimeLine.css';

const TimeLine = ({ timeLineElements }) => (
  <VerticalTimeline
    className="vertical-timeline-custom-line"
    layout="2-columns"
  >
    {
        timeLineElements && timeLineElements.map(({
          key, date, sim, content,
        }) => (
          <VerticalTimelineElement
            key={key}
            className="vertical-timeline-element"
            contentArrowStyle={{ borderRight: '7px solid  rgba(0, 0, 0, 0.08)' }}
            iconStyle={{ background: sim === undefined ? 'darkorange' : 'white', color: 'white' }}
            date={date}
          >
            {content}
          </VerticalTimelineElement>
        ))
      }
  </VerticalTimeline>
);

export default TimeLine;
