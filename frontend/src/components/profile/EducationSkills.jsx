import React, { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Plus, Pencil, Trash } from 'lucide-react';

const EducationSkills = () => {
  const [education, setEducation] = useState([
    {
      id: 1,
      degree: "Bachelor's in Computer Science",
      institution: "Tech University",
      year: "2020-2024",
    },
  ]);

  const [skills, setSkills] = useState([
    "React", "Node.js", "JavaScript", "Python", "SQL"
  ]);

  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Education</h2>
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowEducationForm(true)}
          >
            <Plus className="w-4 h-4" />
            Add Education
          </Button>
        </div>

        <div className="space-y-4">
          {education.map((edu) => (
            <Card key={edu.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full text-red-500">
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Skills</h2>
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowSkillForm(true)}
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </Button>
        </div>

        <Card className="p-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span>{skill}</span>
                <button className="text-gray-500 hover:text-red-500">
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Add Education Modal would go here */}
      {/* Add Skill Modal would go here */}
    </div>
  );
};

export default EducationSkills;
