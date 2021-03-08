import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

const Appointment = () => (
  <Container>
    <Left>
      <Avatar source={{ uri: 'https://robohash.org/gay.png?set=set2' }} />

      <Info>
        <Name>Diego Fernandes</Name>
        <Time>em 3 horas</Time>
      </Info>
    </Left>

    <TouchableOpacity onPress={() => { }}>
      <Icon name="event-busy" size={20} color="#f64c75" />
    </TouchableOpacity>
  </Container>
);

export default Appointment;
