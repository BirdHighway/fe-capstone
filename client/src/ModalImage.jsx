import React from 'react';
import PropTypes from 'prop-types';
import { Thumbnail, Button, ModalBackground, Palette } from './globalStyles.js';
import styled from 'styled-components';

class ModalImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };

    this.ref = React.createRef();
  }

  displayModal() {
    this.setState({active: !this.state.active});
  }

  componentDidUpdate() {
    if (this.state.active) {
      this.ref.current.focus();
    }
  }

  render() {
    if (!this.state.active) {
      return (
        <Thumbnail
          src={this.props.src}
          alt="Customer image upload thumbnail"
          onClick={this.displayModal.bind(this)}
        />
      );
    }
    return (
      <ModalWindow onClick={this.displayModal.bind(this)}>
        <ImageWrapper>
          <PositionedButton
            ref={this.ref}>X</PositionedButton>
          <FullImage
            src={this.props.src}
            alt="Customer image upload full-size"
          />
        </ImageWrapper>
      </ModalWindow>
    );
  }
}

const ModalWindow = styled(ModalBackground)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const PositionedButton = styled(Button)`
  display: inline;
  position: fixed;
  margin-left: 45%;
  opacity: 75%;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  z-index: 100;
  position: fixed;
  top: 25%;
  left: 25%;
  height: 50%;
  width: 50%;
  border: solid 15px ${Palette.foreground};
  border-radius: 1px;
`;

const FullImage = styled.img`
  display: inline;
  height: 100%;
  width: 100%;
`;

ModalImage.propTypes = {
  src: PropTypes.string
};

export default ModalImage;
