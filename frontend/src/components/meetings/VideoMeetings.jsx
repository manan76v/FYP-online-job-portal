import React from 'react';
import { Calendar } from '../ui/calendar';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Video, Clock } from 'lucide-react';

const VideoMeetings = () => {
  const meetings = [
    {
      id: 1,
      company: 'Tech Corp',
      position: 'Senior React Developer',
      datetime: '2024-01-10T14:00:00',
      status: 'upcoming',
      meetingLink: 'https://meet.google.com/abc-defg-hij'
    },
    // Add more mock meetings
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Video Interviews</h1>

      <div className="grid md:grid-cols-[300px,1fr] gap-6">
        <div>
          <Card className="p-4">
            <Calendar 
              mode="single"
              className="rounded-md border"
            />
          </Card>
        </div>

        <div className="space-y-4">
          {meetings.map((meeting) => (
            <Card key={meeting.id} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{meeting.position}</h2>
                  <p className="text-gray-600">{meeting.company}</p>
                  
                  <div className="flex items-center gap-2 mt-2 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date(meeting.datetime).toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => window.open(meeting.meetingLink, '_blank')}
                >
                  <Video className="w-4 h-4" />
                  Join Meeting
                </Button>
              </div>

              <div className="mt-4 text-sm">
                <p className="text-gray-600">
                  Meeting Link: <a href={meeting.meetingLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{meeting.meetingLink}</a>
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoMeetings;
