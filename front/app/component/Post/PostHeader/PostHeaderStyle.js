import Spacings from '../../../styles/spacings';
import Colors from '../../../styles/colors';
import Borders from '../../../styles/borders';

const cardHeaderStyle = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacings._8
};

const authorStyle = {
    fontFamily: 'Roboto-Medium',
    flex: 1
};

const cardHeaderDateStyle = isDarkMode => {
    return {
        backgroundColor: isDarkMode ? Colors.black._80 : Colors.white._50,
        paddingHorizontal: Spacings._8,
        paddingVertical: Spacings._4,
        borderRadius: Borders.radius._8
    };
};

const cardHeaderDateTextStyle = isDarkMode => {
    return {
        color: isDarkMode ? Colors.white._100 : Colors.black._50
    };
};

export {
    cardHeaderStyle,
    authorStyle,
    cardHeaderDateStyle,
    cardHeaderDateTextStyle
};
