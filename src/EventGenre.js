import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const EventGenre = ({ events }) => {
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      const data = genres.map((genre) => {
        const value = events.filter(({ summary }) =>
          summary.split(' ').includes(genre)
        ).length;
        return { name: genre, value };
      }).filter(({ value }) => value > 0); // Filter out genres with value of 0
      return data;
    };

    setData(getData());
  }, [events]);

  const colors = ['#FF0000', '#0000FF', '#ADD8E6', '#E6E6FA'];

  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill="blue"
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="top" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
};

EventGenre.propTypes = {
  events: PropTypes.array.isRequired
};

export default EventGenre;