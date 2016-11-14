import React, { PropTypes, Component } from 'react'
import Popover from 'material-ui/Popover/Popover'
import TextField from 'material-ui/TextField'

class SelectField extends Component {
  constructor (props) {
    super (props)
    const {value, items} = props
    this.state = {
      focused: false,
      opened: false,
      selectedItem: value ? items[value] : items[0]
    }
  }
  _handleFocus() {
    this.setState({focused: true})
  }
  _handleBlur() {
    this.setState({focused: false})
  }

  _handleSelect(event) {
    const {items} = this.props
    const {value} = event.target
    this.setState({selectedItem: items.find(item => item.value == value)})
  }

  _handleKeyDown(event) {
    //console.log(event.keyCode)
    switch (event.keyCode) {
      case 38:
        this._openPopover()
        break;

      case 40:
        this._openPopover()
        break;
    }
  }

  _handleSelectKeyDown(event) {
    if (event.keyCode == 13) {
      event.preventDefault()
      //event.preventDefault()
      this._closePopover()
    }
  }
  _openPopover() {
    this.setState({opened: true})
  }

  _closePopover() {
    const {onChange} = this.props
    const {selectedItem} = this.state
    this.setState({
      opened: false}, () => {
        this.refs.textField.focus()
        onChange && onChange(selectedItem.value)
      }
    )

  }

  render () {
    const {title, items, name, required} = this.props
    const {focused, opened, selectedItem} = this.state
    //console.log('SelectField', this.props, this.state, this.refs)
    return (
      <div className={`c-field ${focused ? 'c-field_focused' : ''}`}>
        <TextField
          style={{marginTop: 0, cursor: 'pointer'}}
          floatingLabelText={required ? title+' *' : title}
          required={required}
          value={selectedItem.title}
          id='variants'
          ref='textField'
          autocomplete={false}
          fullWidth={true}
          onClick={this._openPopover.bind(this)}
          onFocus={this._handleFocus.bind(this)}
          onBlur={this._handleBlur.bind(this)}
          onKeyDown={this._handleKeyDown.bind(this)}
        />
        <input type='hidden' name={name} value={selectedItem.value}/>
        <Popover
          anchorEl={this.refs.textField && this.refs.textField.input}
          anchorOrigin={{'horizontal':'left','vertical':'bottom'}}
          open={opened}
          onRequestClose={this._closePopover.bind(this)}
          >
          <select
            className='c-select'
            style={{overflow: 'visible'}}
            size={items.length}
            value={selectedItem.value}
            onChange={this._handleSelect.bind(this)}
            onKeyDown={this._handleSelectKeyDown.bind(this)}
            onClick={this._closePopover.bind(this)}
            ref={e => e && opened && e.focus()}
            >
            {
              items.map(item =>
                <option
                  className='c-select__item'
                  style={{padding:'1rem', cursor: 'pointer'}}
                  key={item.value}
                  value={item.value}
                  >
                  {item.title}
                </option>
              )
            }
          </select>
        </Popover>
      </div>
    )
  }
}

const getDefaultChecked = (item, value) =>
  value && ([].concat(value).indexOf(item.id)>-1 || [].concat(value).indexOf(item.title)>-1)

export default SelectField