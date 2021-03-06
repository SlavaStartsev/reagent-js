import React, { PropTypes, Component } from 'react'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class RadioField extends Component {
  constructor (props) {
    super (props)
    this.state = {
      focused: false
    }
  }
  render () {
    const {name, style, items, title, onChange} = this.props
    const {focused} = this.state
    return (
      <div className={`c-field ${focused ? 'c-field_focused' : ''}`}>
        {title ? <label className='c-field__label'>{title}</label> : null}
        <RadioButtonGroup
          name={name}
          defaultSelected={getDefaultSelected (this.props)}
          style={style}
          onChange={onChange}
          >
          {
            items.map (item => (
              <RadioButton
                key={item.id}
                value={item.id}
                label={item.title}
                onFocus={() => this.setState({focused: true})}
                onBlur={() => this.setState({focused: false})}
                {...item}
              />
            ))
          }
        </RadioButtonGroup>
      </div>
    )
  }
}

const getDefaultSelected = ({items, value, defaultValue}) => items.reduce((id, item) => {
  if (item.id == (value || defaultValue) || item.title == (value|| defaultValue)) {
    return item.id
  }
  return id
}, null)

RadioField.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    title: PropTypes.string.isRequired
  })).isRequired,
  style: PropTypes.object
}
export default RadioField
