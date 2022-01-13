import { Stack } from '@stacks/ui';

import { Caption } from '@app/components/typography';
import NoActivity from '@assets/images/no-activity-light.png';

export function NoAccountActivity() {
  return (
    <Stack py="extra-loose" spacing="base" justifyContent="center" alignItems="center">
      <img src={NoActivity} width="134px" />
      <Caption maxWidth="23ch" textAlign="center">
        No activity yet.
      </Caption>
    </Stack>
  );
}
