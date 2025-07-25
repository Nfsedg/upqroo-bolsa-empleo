'use client';

import { useEffect, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

type State = {
  id: number;
  name: string;
};

export default function StateSelect({
  value,
  onChange,
  className
}: {
  value?: number;
  onChange?: (name: number) => void;
  className?: string
}) {
  const [states, setStates] = useState<State[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<State | null>(null);

  useEffect(() => {
    fetch('/api/states')
      .then((res) => res.json())
      .then(setStates);
  }, []);

  useEffect(() => {
    if (value && states.length > 0) {
      const found = states.find((s) => s.id === value) ?? null;
      setSelectedState(found);
    }
  }, [value, states]);

  const handleSelect = (state: State) => {
    setSelectedState(state);
    onChange?.(state.id);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={"w-full justify-between " + className}
        >
          {selectedState ? selectedState.name : 'Selecciona un estado'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search state..." />
          <CommandEmpty>No se encontraron estados.</CommandEmpty>
          <CommandGroup className='max-h-[350px] overflow-auto'>
            <CommandItem
                onSelect={() => handleSelect({id: 0, name: "Todos"})}
              >
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  selectedState?.id === 0 ? 'opacity-100' : 'opacity-0'
                )}
              />
              Todos
              </CommandItem>
            {states.map((state) => (
              <CommandItem
                key={state.id}
                onSelect={() => handleSelect(state)}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    selectedState?.id === state.id ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {state.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
