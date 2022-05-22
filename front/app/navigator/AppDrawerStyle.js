import NavigatorStyle from './NavigatorStyle';
import Spacings from '../styles/spacings';
import Fonts from '../styles/fonts';

export const logStatusViewStyle = {
    backgroundColor: NavigatorStyle.backgroundColor,
    alignItems: 'center',
    paddingVertical: Spacings._20
};

export const logStatusTextStyle = {
    color: NavigatorStyle.color,
    lineHeight: Fonts.size.lg
};

export const menuViewStyle = {
    flex: 1,
    paddingTop: Spacings._8
};
