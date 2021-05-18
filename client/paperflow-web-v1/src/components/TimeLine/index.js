import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import useRootData from '../../hooks/useRootData';
import 'react-vertical-timeline-component/style.min.css';
import './customVerticalTimeLine.css';

const TimeLine = ({ timeLineElements }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  // eslint-disable-next-line no-unused-vars
  const isDesktop = screenClass === 'xl';

  // const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  return (
    <VerticalTimeline
      className="vertical-timeline-custom-line"
      layout="2-columns"
    >
      {
        timeLineElements && timeLineElements.map(({ key, date, content }) => (
          <VerticalTimelineElement
            key={key}
            className="vertical-timeline-element"
            contentArrowStyle={{ borderRight: '7px solid  rgba(0, 0, 0, 0.08)' }}
            iconStyle={{ background: 'white', color: 'white' }}
            date={date}
          >
            {content}
          </VerticalTimelineElement>
        ))
      }
    </VerticalTimeline>
  );
};

export default TimeLine;
