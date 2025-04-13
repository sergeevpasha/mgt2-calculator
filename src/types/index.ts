export interface DesignFocus {
  focus1: number[];
  focus2: number[];
  direction: number[];
}

export interface Genre {
  id: string;
  name: string;
  subgenres: string[];
  targetGroups: string[];
  designPriority: number[];
  designFocus: {
    [key: string]: DesignFocus;
  };
  topics: string[];
}

export interface Topic {
  id: string;
  name: string;
}

export interface DesignValuesProps {
  values: number[];
  type?: 'focus' | 'direction';
}

export interface DesignPriorityProps {
  title: string;
  values: number[];
}
