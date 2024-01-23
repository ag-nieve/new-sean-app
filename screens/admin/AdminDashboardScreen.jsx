import { useEffect, useState } from "react";
import { Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";


export default function AdminDashboardScreen(props){

    const [categoryLength, setCategoryLength] = useState(0);
    const [productLength, setProductLength] = useState(0);
    const [consumerLength, setConsumerLength] = useState(0);
    const [farmersLength, setFarmersLength] = useState(0);

    useEffect(()=> {
        (async ()=> {
            const response = await fetch(`https://sean-aaccd-default-rtdb.asia-southeast1.firebasedatabase.app/categories.json`);
            const response2 = await fetch(`https://sean-aaccd-default-rtdb.asia-southeast1.firebasedatabase.app/products.json`);
            const response3 = await fetch(`https://sean-aaccd-default-rtdb.asia-southeast1.firebasedatabase.app/users.json`);
            const result = await response.json();
            const objKeys = Object.keys(result);
            const result2 = await response2.json();
            const objKeys2 = Object.keys(result2);
            const result3 = await response3.json();
            const objKeys3 = Object.keys(result3);

            let noConsumer = 0;
            let noFarmer = 0;

            for(let i =0; i < objKeys3.length; i++){
                console.log(result3[objKeys3[i]]);
                if(result3[objKeys3[i]].type === 'consumer'){
                    noConsumer = noConsumer + 1;
                }else if(result3[objKeys3[i]].type === 'farmer'){
                    noFarmer += 1;
                }
            }

            setFarmersLength(noFarmer);
            setConsumerLength(noConsumer);
            setCategoryLength(objKeys.length);
            setProductLength(objKeys2.length);

        })();
    }, []);

    return <View className={'flex flex-1 p-3'}>
        <View className={'p-5 bg-orange-400 rounded-xl mb-3'}>
            <Text className={'text-6xl text-white'}>{categoryLength}</Text>
            <Text className={'text-2xl text-white'}>Categories</Text>
        </View>
        <View className={'p-5 bg-blue-400 rounded-xl mb-3'}>
            <Text className={'text-6xl text-white'}>{productLength}</Text>
            <Text className={'text-2xl text-white'}>Products</Text>
        </View>
        <View className={'p-5 bg-red-400 rounded-xl mb-3'}>
            <Text className={'text-6xl text-white'}>{consumerLength}</Text>
            <Text className={'text-2xl text-white'}>Consumers</Text>
        </View>
        <View className={'p-5 bg-yellow-400 rounded-xl mb-3'}>
            <Text className={'text-6xl text-white'}>{farmersLength}</Text>
            <Text className={'text-2xl text-white'}>Farmers</Text>
        </View>
        <View className={'p-5 bg-green-400 rounded-xl mb-3'}>
            <Text className={'text-6xl text-white'}>0</Text>
            <Text className={'text-2xl text-white'}>Transactions</Text>
        </View>
    </View>
}