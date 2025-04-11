import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoals } from '../redux/goalsSlice';
import { fetchTasks } from '../redux/tasksSlice';
import './Sidebar.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals.goals);
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  const handleGoalClick = (goalId) => {
    dispatch(fetchTasks(goalId));
  };

  return (
    <div className="sidebar">
      <h3>🎯 Goals</h3>
      {goals.map((goal) => (
        <div key={goal._id}>
          <button onClick={() => handleGoalClick(goal._id)}>{goal.name}</button>
        </div>
      ))}

      <h4>📋 Tasks</h4>
      <div>
        {tasks.map((task) => (
          <div
            key={task._id}
            className="draggable-task"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('taskName', task.name);
              e.dataTransfer.setData('goalId', task.goalId);
            }}
          >
            {task.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

