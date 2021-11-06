import { bindActionCreators, Dispatch } from 'redux';
import { State } from '../../store/reducer';
import {changeOptionSorting} from '../../store/action';
import { connect, ConnectedProps } from 'react-redux';

type SortingOptionItemProps = {
  option: string,
  onCloseOptionListClick: () => void,
}

const mapStateToProps = ({activeOption}: State) => ({activeOption});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({onOptionClick: changeOptionSorting}, dispatch);
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function SortingOptionItem({option, onOptionClick, activeOption, onCloseOptionListClick}: SortingOptionItemProps & PropsFromRedux): JSX.Element {

  const handleOptionClick = () => {
    onOptionClick(option);
    onCloseOptionListClick();
  };

  return (
    <li  onClick={handleOptionClick} className={activeOption === option ?
      'places__option places__option--active' :
      'places__option'}
    tabIndex={0}
    >
      {option}
    </li>
  );
}

export default connector(SortingOptionItem);