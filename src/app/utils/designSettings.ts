import type { DesignFocus } from '#shared/genres';
import { focusLabels, priorityLabels } from '~/data/designLabels';

export interface LabeledValue {
  label: string;
  value: number;
}

export interface LabeledFocus {
  focus1: LabeledValue[];
  focus2: LabeledValue[];
  direction: LabeledValue[];
}

// The genre files list slider values in the in-game order, which is the order of the labels.
const withLabels = (labels: string[], values: number[]): LabeledValue[] =>
  values.map((value, index) => ({ label: labels[index] ?? '', value }));

export const labelPriority = (values: number[]): LabeledValue[] => withLabels(priorityLabels, values);

export const labelFocus = (focus: DesignFocus): LabeledFocus => ({
  focus1: withLabels(focusLabels.focus1, focus.focus1),
  focus2: withLabels(focusLabels.focus2, focus.focus2),
  direction: withLabels(focusLabels.direction, focus.direction),
});

// Label every value so a pasted note still says which slider is which.
const join = (rows: LabeledValue[], unit = ''): string =>
  rows.map(({ label, value }) => `${label} ${value}${unit}`).join(' / ');

export const formatDesignSettings = (title: string, priority: LabeledValue[], focus: LabeledFocus): string =>
  [
    title,
    `Development priority: ${join(priority, '%')}`,
    `Design focus 1: ${join(focus.focus1)}`,
    `Design focus 2: ${join(focus.focus2)}`,
    `Design direction: ${join(focus.direction)}`,
  ].join('\n');
