import React from 'react';
import { Globe, Tv, Users } from 'lucide-react';
import OptionCard from './OptionCard';
import { Environment } from '../types';

interface EnvironmentSelectionProps {
  environments: Environment[];
  selectedEnvironment: string | null;
  onEnvironmentSelect: (envId: string) => void;
}

const EnvironmentSelection: React.FC<EnvironmentSelectionProps> = ({
  environments,
  selectedEnvironment,
  onEnvironmentSelect,
}) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Tv':
        return <Tv className="h-5 w-5" />;
      case 'Globe':
        return <Globe className="h-5 w-5" />;
      case 'Users':
        return <Users className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Select an environment</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {environments.map((env) => (
          <OptionCard
            key={env.id}
            title={env.title}
            description={env.description}
            icon={getIconComponent(env.icon)}
            isSelected={selectedEnvironment === env.id}
            isDisabled={selectedEnvironment !== null && selectedEnvironment !== env.id}
            onClick={() => onEnvironmentSelect(env.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default EnvironmentSelection; 