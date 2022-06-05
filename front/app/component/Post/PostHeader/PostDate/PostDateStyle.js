import Spacings from '../../../../styles/spacings';
import Colors from '../../../../styles/colors';
import Borders from '../../../../styles/borders';

const headerDateStyle = isDarkMode => {
    return {
        backgroundColor: isDarkMode ? Colors.black._80 : Colors.white._50,
        paddingHorizontal: Spacings._8,
        paddingVertical: Spacings._4,
        borderRadius: Borders.radius._8
    };
};

const headerDateTextStyle = isDarkMode => {
    return {
        color: isDarkMode ? Colors.white._100 : Colors.black._50
    };
};

export { headerDateStyle, headerDateTextStyle };
