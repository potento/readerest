import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#393852',
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6cbdb5',
    borderRadius: 30,
    padding: 15,
    marginHorizontal: 10,
  },
  speedButton: {
    backgroundColor: '#93ccc6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  word: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#e3dfba',
  },
  speedText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});
