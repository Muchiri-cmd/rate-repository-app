import { View, StyleSheet, Image, Pressable,Button } from 'react-native';
import Text from './Text';
import theme from './theme';

//Displays counts such as the number of stars and forks larger than or equal to 1000 
//in thousands with the precision of one decimal and with a "k" suffix.
const formatCount = (count) => {
  if (count === undefined || count === null) {
    return '0';
  }

  if (count >= 1000) {
    const roundedCount = Math.floor(count / 1000);
    if (count % 1000 === 0) {
      return `${roundedCount}k`; 
    } else {
      const formattedCount = (count / 1000).toFixed(1);
      return formattedCount.endsWith('.0') ? `${Math.floor(count / 1000)}k` : `${formattedCount}k`;
    }
  } else {
    return count.toString();
  }
};

const RepositoryItem = (props) => {
  return (
    <View style={styles.container} testID='repositoryItem'>

      <View style={styles.flex}>
        <Image
          style={styles.img}
          source={{
            uri: props.ownerAvatarUrl,
          }}
        />

        <View style={styles.repoInfo}>
          <Text fontSize="subheading" fontWeight="bold">{props.fullName}</Text>
          <Text color="textSecondary" style={styles.description}>{props.description}</Text>
          <Pressable style={styles.languageTag}>
            <Text color="white">{props.language}</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.flexStats}>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(props.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>

        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(props.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>

        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(props.reviewCount)}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>

        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(props.ratingAverage)}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>

      {props.openInGithub && (
        <Button title="Open in Github" onPress={props.openInGithub} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: theme.colors.white,
    borderRadius: 8,
  },
  img: {
    width: 66,
    height: 58,
    borderRadius: 8, 
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 15,
  },
  repoInfo: {
    flex: 1,
  },
  flexStats: {
    flexDirection: 'row',
    gap: 30,
    marginTop: 10,
    justifyContent: 'space-between',
    marginLeft:40 
  },
  statItem: {
    alignItems: 'center',
  },
  languageTag: {
    marginTop: 2,
    backgroundColor: '#0077b6',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start', 
  },
  description: {
    marginBottom: 8,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});

export default RepositoryItem;
