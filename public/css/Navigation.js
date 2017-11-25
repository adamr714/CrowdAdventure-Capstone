import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'header': {
    'backgroundColor': '#0e3d69',
    'paddingTop': [{ 'unit': 'em', 'value': 0.5 }],
    'paddingLeft': [{ 'unit': 'em', 'value': 0.5 }],
    'paddingBottom': [{ 'unit': 'em', 'value': 0.5 }]
  },
  'logo': {
    'textAlign': 'center'
  },
  'navigation': {
    // background-color: black;
    'textAlign': 'center'
  },
  'navigation ul': {
    'paddingLeft': [{ 'unit': 'px', 'value': 0 }]
  },
  'navigation li': {
    // list-style-type: none;
    // margin-left: 0 auto;
    margin-right: 0 auto;
    text-align: center;
    'color': 'whitesmoke',
    'display': 'inline-block',
    'padding': [{ 'unit': 'em', 'value': 1 }, { 'unit': 'em', 'value': 1 }, { 'unit': 'em', 'value': 1 }, { 'unit': 'em', 'value': 1 }],
    'fontVariant': 'small-caps',
    'fontSize': [{ 'unit': 'em', 'value': 1.2 }]
  }
});
