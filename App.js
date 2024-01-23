import 'react-native-gesture-handler';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Fragment } from 'react';
import { useUserStore } from './zustand_store/auth';
import LoginScreen from './screens/LoginScreen';
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen';
import CategoryScreen from './screens/admin/CategoryScreen';
import ProductScreen from './screens/admin/ProductScreen';
import TransactionScreen from './screens/admin/TransactionScreen';
import LogoutScreen from './screens/LogoutScreen';
import FarmerDashboardScreen from './screens/farmer/FarmerDashboardScreen';
import FarmerProductScreen from './screens/farmer/FarmerProductScreen';
import FarmerTransactionScreen from './screens/farmer/FarmerTransactionScreen';
import ConsumerDashboardScreen from './screens/consumer/ConsumerDashboardScreen';
import ConsumerProductScreen from './screens/consumer/ConsumerProductScreen';
import ConsumerTransactionScreen from './screens/consumer/ConsumerTransactionScreen';
import MyProductScreen from './screens/farmer/MyProductScreen';

const Drawer = createDrawerNavigator();
const adminButtons = [
  {
      nav: 'AdminDashboard',
      title: 'Dashboard',
      icon: <Ionicons name="home" size={30} color="#606060" />
  },
  {
      nav: 'Category',
      title: 'Category',
      icon: <Ionicons name="bookmark" size={30} color="#606060" />
  },
  {
      nav: 'Product',
      title: 'Product',
      icon: <Ionicons name="list" size={30} color="#606060" />
  },
  {
      nav: 'Transaction',
      title: 'Transaction',
      icon: <Ionicons name="cash-outline" size={30} color="#606060" />
  },
  {
      nav: 'Logout',
      title: 'Logout',
      icon: <Ionicons name="log-out" size={30} color="#606060" />
  },
];

const farmerButtons = [
  {
      nav: 'FarmerDashboard',
      title: 'Farmer Dashboard',
      icon: <Ionicons name="home" size={30} color="#606060" />
  },
  {
    nav: 'MyProduct',
    title: 'My Product',
    icon: <Ionicons name="list-outline" size={30} color="#606060" />
  },
  {
      nav: 'FarmerProduct',
      title: 'Product',
      icon: <Ionicons name="bookmark" size={30} color="#606060" />
  },
  {
      nav: 'FarmerTransaction',
      title: 'Transaction',
      icon: <Ionicons name="cash-outline" size={30} color="#606060" />
  },
  {
      nav: 'Logout',
      title: 'Logout',
      icon: <Ionicons name="log-out" size={30} color="#606060" />
  },
];

const consumerButtons = [
  {
      nav: 'ConsumerDashboard',
      title: 'Consumer Dashboard',
      icon: <Ionicons name="home" size={30} color="#606060" />
  },
  {
      nav: 'ConsumerProduct',
      title: 'Product',
      icon: <Ionicons name="bookmark" size={30} color="#606060" />
  },
  {
      nav: 'ConsumerTransaction',
      title: 'Transaction',
      icon: <Ionicons name="cash-outline" size={30} color="#606060" />
  },
  {
      nav: 'Logout',
      title: 'Logout',
      icon: <Ionicons name="log-out" size={30} color="#606060" />
  },
];


function MyDrawer(props) {

  const { user } = props;
  return (
    <Drawer.Navigator 
      useLegacyImplementation={false}
        screenOptions={{
            headerStyle: { backgroundColor: '#036194' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerBackVisible: false,
        }}
        drawerContent={(props) => (
            <SafeAreaView className={''}>
                <View className={'bg-[#036194] pb-5 pt-20'}>
                    <Text className={'text-center text-bold text-lg text-[#fff] mb-3'}>FARMIER</Text>
                    <View className={'px-4'}>
                        <Text className={'text-white'}>{user.username}</Text>
                        <Text className={'text-white'}>{user.email}</Text>
                    </View>
                </View>
                {
                    user.type === 'admin' ? adminButtons.map((button, index) => {
                        const { icon, title, nav} = button;

                        return <Fragment key={index}>
                            <View className={'px-4 py-4'} >
                                <TouchableOpacity
                                    className={'flex flex-row gap-x-5 items-center'}
                                    onPress={() => props.navigation.navigate(nav)}
                                >
                                    {icon}
                                    <Text>{title}</Text>
                                </TouchableOpacity>
                            </View>
                            <View className={'px-4 border-b border-b-emerald-50 mx-3'}></View>
                        </Fragment>
                    }) : 
                    user.type === 'farmer' ? 
                    farmerButtons.map((button, index) => {
                        const { icon, title, nav} = button;

                        return <Fragment key={index}>
                            <View className={'px-4 py-4'} >
                                <TouchableOpacity
                                    className={'flex flex-row gap-x-5 items-center'}
                                    onPress={() => props.navigation.navigate(nav)}
                                >
                                    {icon}
                                    <Text>{title}</Text>
                                </TouchableOpacity>
                            </View>
                            <View className={'px-4 border-b border-b-emerald-50 mx-3'}></View>
                        </Fragment>
                    }):
                    user.type === 'consumer' ? 
                    consumerButtons.map((button, index) => {
                        const { icon, title, nav} = button;

                        return <Fragment key={index}>
                            <View className={'px-4 py-4'} >
                                <TouchableOpacity
                                    className={'flex flex-row gap-x-5 items-center'}
                                    onPress={() => props.navigation.navigate(nav)}
                                >
                                    {icon}
                                    <Text>{title}</Text>
                                </TouchableOpacity>
                            </View>
                            <View className={'px-4 border-b border-b-emerald-50 mx-3'}></View>
                        </Fragment>
                    }): null
                }

            </SafeAreaView>
        )}
      >
      {
          user.type === 'admin' ? <>
          <Drawer.Screen
              name="AdminDashboard"
              options={({navigation}) => ({
                  title: 'Dashboard'
              })} 
              component={AdminDashboardScreen} 
          />
          <Drawer.Screen name="Category" component={CategoryScreen} />
          <Drawer.Screen name="Product" component={ProductScreen} />
          <Drawer.Screen name="Transaction" component={TransactionScreen} />
          <Drawer.Screen name="Logout" component={LogoutScreen} />
          </> : 
          user.type === 'farmer' ? 
          <>
          <Drawer.Screen
              name="FarmerDashboard"
              component={FarmerDashboardScreen}
              options={({navigation}) => ({
                      title: 'Dashboard'
                  })} 
            />
          <Drawer.Screen
              name="FarmerProduct"
              component={FarmerProductScreen}
              options={({navigation}) => ({
                      title: 'Products'
              })} 
          />
          <Drawer.Screen
              name="MyProduct"
              component={MyProductScreen}
              options={({navigation}) => ({
                      title: 'My Products'
              })} 
          />
          <Drawer.Screen 
              name="FarmerTransaction"
              component={FarmerTransactionScreen}
              options={({navigation}) => ({
                      title: 'Transactions'
              })} 
          />
          <Drawer.Screen name="Logout" component={LogoutScreen} />
          </> : 
          user.type === 'consumer' ?
          <>
          <Drawer.Screen 
              name="ConsumerDashboard"
              component={ConsumerDashboardScreen}
              options={({navigation}) => ({
                      title: 'Dashboard'
              })} 
          />
          <Drawer.Screen 
              name="ConsumerProduct"
              component={ConsumerProductScreen}
              options={({navigation}) => ({
                      title: 'Products'
              })} 
          />
          <Drawer.Screen 
              name="ConsumerTransaction"
              component={ConsumerTransactionScreen}
              options={({navigation}) => ({
                      title: 'Transactions'
              })} 
          />
          <Drawer.Screen name="Logout" component={LogoutScreen} />
          </> : null
      }
    </Drawer.Navigator>
  );
}

export default function App() {

  const user = useUserStore((state) => state.user);

  return (
    <NavigationContainer>
      {
        user ? (
            <MyDrawer user={user} />
        ) : (
            <LoginScreen />
        )
    }
    </NavigationContainer>
  );
}