// import React from 'react';
// import PropTypes from 'prop-types';
// import {Input} from "@material-ui/core";
//
// class TextInput extends React.Component {
//     onUpdate(e) {
//         const {onUpdate, name} = this.props;
//         let newValue = e.target.value;
//
//         onUpdate(name, newValue);
//     }
//
//     render() {
//         const { value, label, type} = this.props;
//         return (
//             <div>
//                 <Input value={value} type={type} placeholder={label} onChange={(e) => this.onUpdate(e)} />
//             </div>
//         );
//     }
// }
//
// TextInput.propTypes = {
//     type: PropTypes.string.isRequired,
//     label: PropTypes.string,
//     className: PropTypes.string.isRequired,
//     onUpdate: PropTypes.func.isRequired,
//     name: PropTypes.string.isRequired,
//     value: PropTypes.string.isRequired,
// };
//
// export default TextInput;
//
