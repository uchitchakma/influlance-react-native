import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { WebView } from 'react-native-webview';


const App = (): React.JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const webViewRef = useRef(null);

  const handleReload = () => {
    setError(false);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const renderError = () => (
    <View style={styles.fullScreenCenter}>
      <LottieView
        source={require('./assets/cat-animation.json')}
        autoPlay
        loop
        style={styles.lottieStyle}
      />
      <Text style={styles.errorMessage}>
        Oops! It looks like you're offline. Please check your internet connection and try again.
      </Text>
      <TouchableOpacity style={styles.tryAgainButton} onPress={handleReload}>
        <Text style={styles.tryAgainButtonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.flexContainer}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://influlance.com' }}
        style={styles.flexContainer}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onError={() => setError(true)}
        renderError={renderError}
        startInLoadingState={true}
      />
      {loading && !error && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#0000ff" size="large" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  fullScreenCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieStyle: {
    width: 300,
    height: 300,
  },
  errorMessage: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
  tryAgainButton: {
    marginTop: 20,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  tryAgainButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
