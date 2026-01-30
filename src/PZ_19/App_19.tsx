import React, {useEffect, useState} from 'react';
import LoginScreen from './screens/LoginScreen';
import UsersScreen from './screens/UsersScreen';
import RegisterScreen from './screens/RegisterScreen';
import {User} from './db/models';
import {subscribeToAuth} from './db/Database';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

const App_19: React.FC = () => {
  const [authorizedUser, setAuthorizedUser] = useState<User | null>(null);
  const [loginOrRegister, setLoginOrRegister] = useState<'login' | 'register'>(
    'login',
  );
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth(user => {
      setAuthorizedUser(user);
      if (initializing) {
        setInitializing(false);
      }
    });

    return () => unsubscribe();
  }, [initializing]);

  if (initializing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (!authorizedUser) {
    return loginOrRegister === 'login' ? (
      <LoginScreen
        setLogin={setAuthorizedUser}
        onRegister={() => setLoginOrRegister('register')}
      />
    ) : (
      <RegisterScreen
        setLogin={setAuthorizedUser}
        onLogin={() => setLoginOrRegister('login')}
      />
    );
  }

  return (
    <UsersScreen
      authorizedUser={authorizedUser}
      logout={() => setAuthorizedUser(null)}
    />
  );
};

export default App_19;

const styles = StyleSheet.create({
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
