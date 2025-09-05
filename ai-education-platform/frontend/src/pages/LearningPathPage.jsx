import React from 'react';
import { useParams } from 'react-router-dom';

function LearningPathPage() {
  const { pathId } = useParams();
  return <div className="container mx-auto p-4">Learning Path {pathId} Placeholder</div>;
}

export default LearningPathPage;
