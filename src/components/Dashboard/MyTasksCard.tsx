import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MyTasksCardProps {
  className?: string;
}

interface Task {
  id: string;
  description: string;
  completed: boolean;
  dueDate: string;
  priority?: 'high' | 'medium' | 'low';
}

const initialTasks: Task[] = [
  {
    id: '1',
    description: 'Review and make sure nothing slips through cracks',
    completed: false,
    dueDate: '15 Sep, 2021',
    priority: 'high' as const,
  },
  {
    id: '2',
    description: 'Send meeting invites for sales upcampaign',
    completed: true,
    dueDate: '20 Sep, 2021',
    priority: 'medium' as const,
  },
  {
    id: '3',
    description: 'Weekly closed sales won checking with sales team',
    completed: false,
    dueDate: '24 Sep, 2021',
  },
  {
    id: '4',
    description: 'Add notes that can be viewed from the individual view',
    completed: false,
    dueDate: '27 Sep, 2021',
    priority: 'low' as const,
  },
  {
    id: '5',
    description: 'Move stuff to another page',
    completed: true,
    dueDate: '27 Sep, 2021',
  },
];

const MyTasksCard: React.FC<MyTasksCardProps> = ({ className }) => {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const remainingTasks = tasks.filter(task => !task.completed).length;
  const totalTasks = tasks.length;

  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-medium">My Tasks</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
          <Button size="sm" className="h-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {remainingTasks} of {totalTasks} remaining
        </p>
        <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between py-2 border-b border-dashed last:border-b-0">
              <div className="flex items-center">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task.id)}
                  className="mr-3"
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={cn(
                    'text-sm font-medium leading-none',
                    task.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'
                  )}
                >
                  {task.description}
                </label>
              </div>
              <span className={cn('text-xs', task.completed ? 'text-muted-foreground' : 'text-gray-500')}>
                {task.dueDate}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyTasksCard;
