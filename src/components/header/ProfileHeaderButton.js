import React, { useCallback } from 'react';
import { useNavigation } from '../../navigation/Navigation';
import { NumberBadge } from '../badge';
import { ContactAvatar } from '../contacts';
import ImageAvatar from '../contacts/ImageAvatar';
import { Centered } from '../layout';
import HeaderButton from './HeaderButton';
import {
  useAccountProfile,
  useRainbowProfile,
  useRequests,
} from '@rainbow-me/hooks';
import Routes from '@rainbow-me/routes';

export default function ProfileHeaderButton() {
  const { navigate } = useNavigation();
  const { pendingRequestCount } = useRequests();
  const { accountAddress, accountImage } = useAccountProfile();
  const { rainbowProfile } = useRainbowProfile(accountAddress);

  const onPress = useCallback(() => navigate(Routes.PROFILE_SCREEN), [
    navigate,
  ]);

  const onLongPress = useCallback(() => navigate(Routes.CHANGE_WALLET_SHEET), [
    navigate,
  ]);

  const { colors } = useTheme();

  return (
    <HeaderButton
      onLongPress={onLongPress}
      onPress={onPress}
      testID="navbar-profile-button"
      transformOrigin="left"
    >
      <Centered>
        {accountImage ? (
          <ImageAvatar image={accountImage} size="header" />
        ) : (
          <ContactAvatar
            color={rainbowProfile?.color ?? colors.skeleton}
            size="small"
            value={rainbowProfile?.emoji}
          />
        )}
        <NumberBadge
          isVisible={Number(pendingRequestCount) > 0}
          value={pendingRequestCount}
        />
      </Centered>
    </HeaderButton>
  );
}
