import React from 'react';
import {
  StyleSheet,
  ListView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  Time,
  Separator,
  items2DataSource,
} from '../common';


const styles = StyleSheet.create({
  album: {
    height: 140,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  album_artwork: {
    width: 120,
    height: 120,
  },
  album_body: {
    flex: 1,
    paddingLeft: 10,
  },
  album_body_text: {
    fontSize: 20,
  },

  list_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 0,
  },
  list_row_trackNo: {
    width: 30,
    textAlign: 'center',
  },
  list_row_title: {
    flex: 1,
    textAlign: 'left',
  }
});

class AlbumItem extends React.Component {
  render() {
    const {
      title,
      artist,
      artwork,
      releaseYear,
      duration,
      songs,
    } = this.props.album;
    const {
      onPressRow,
    } = this.props;

    return (
      <ListView
        dataSource={items2DataSource(songs)}
        renderSectionHeader={ () => {
          return (
            <View style={styles.album}>
              <Image style={styles.album_artwork} source={{ uri: artwork }} />
              <View style={styles.album_body}>
                <Text style={styles.album_body_text}>{title}</Text>
                <Text style={styles.album_body_text}>{artist}</Text>
                { releaseYear ? <Text>{releaseYear}年</Text> : null }
                <Text>{songs.length}曲 / <Time seconds={duration} /></Text>
              </View>
            </View>
          );
        } }
        renderRow={ (rowData) => {
          return (
            <TouchableOpacity onPress={() => {
              onPressRow(rowData.persistentID, rowData.albumPersistentID);
            }}>
              <View style={styles.list_row}>
                <Text style={styles.list_row_trackNo}>{rowData.trackNo}</Text>
                <Text style={styles.list_row_title}>{rowData.title}</Text>
                <Time seconds={rowData.duration} />
              </View>
            </TouchableOpacity>
          );
        } }
        renderSeparator={ (sectionID: number, rowID: number) => {
          return <Separator key={`${sectionID}-${rowID}`} />;
        } }
      />
    );
  }
}

AlbumItem.propTypes = {
  album:      React.PropTypes.object.isRequired,
  onPressRow: React.PropTypes.func.isRequired,
};

export default AlbumItem;
