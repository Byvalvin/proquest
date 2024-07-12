import React from 'react';
import Section from './Section';

const Sections = () => {
  const sections = [
    {
      title: 'For Players',
      description: 'Join the Expanding Network of players',
      bgcolour: 'bg-blue-100',
      btname: 'add profile',
      btncolour: 'bg-blue',
      to: '/join',
    },
    {
      title: 'For Scouts',
      description: "Find the World's Greatest",
      bgcolour: 'bg-gray-100',
      btname: 'view talent',
      btncolour: 'bg-green',
      to: '/players',
    },
  ];

  return (
    <div className="flex justify-between">
      {sections.map((section, index) => (
        <Section
          key={index}
          title={section.title}
          description={section.description}
          bgcolour={section.bgcolour}
          btname={section.btname}
          to={section.to}
          btncolour={section.btncolour}
        />
      ))}
    </div>
  );
};

export default Sections;
