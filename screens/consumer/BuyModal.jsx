import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, Text, TextInput, View, TouchableOpacity, SafeAreaView } from "react-native";
import { useUserStore } from "../../zustand_store/auth";



async function updateProduct(productId, quantity){
    const base_url = `https://sean-aaccd-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json`;

    const options = {
        method: "PATCH",
        body: JSON.stringify({
            'quantity' : quantity,
        })
    }

    const response = await fetch(base_url, options);
    console.log("response: ", await response.json());
}

export default function BuyModal(props){
    
    const { isVisible, setIsVisible, setNewData, selectedId } = props;
    const [quantity, setQuantity] = useState("0");
    const [isSuccess, setIsSuccess] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [action, setAction] = useState(0);
    const [error, setError] = useState("");

    const user = useUserStore((state) => state.user);

    console.log("selectedId: ", selectedId);

    useEffect(()=> {
        
        (async () => {
            const base_url = `https://sean-aaccd-default-rtdb.asia-southeast1.firebasedatabase.app/products/${selectedId}.json`;
            const response = await fetch(base_url);
            const result = await response.json();
            console.log("result: ", result);
            setSelectedProduct(result);
            setAction(prev => prev + 1);
        })();

    }, [selectedId, quantity]);

    const buyHandler = async () => {
        
        if(!error) {
            const base_url = `https://sean-aaccd-default-rtdb.asia-southeast1.firebasedatabase.app/consumer_transactions.json`;

            const options = {
                method: "POST",
                body: JSON.stringify({
                    'product': selectedProduct,
                    'consumer' : user,
                    'quantity' : quantity,
                    'dateTime': new Date()
                })
            }

            const response = await fetch(base_url, options);
            console.log("response: ", await response.json());

            const totalQuantity = selectedProduct.quantity ? (parseInt(selectedProduct?.quantity) - parseInt(quantity)) : parseInt(quantity);
            const resultUpdate = await updateProduct(selectedId, totalQuantity);
            
            console.log("resultUpdate: ", resultUpdate);

            setIsSuccess(true);
            setAction(prev => prev + 1);
            setIsVisible(false);

            setNewData({
                'product': selectedProduct,
                'consumer' : user,
                'quantity' : quantity,
                'dateTime': new Date()
            })
        }
    };

    return <Modal
    className={'flex'}
    animationType="slide"
    transparent={false}
    visible={isVisible}
    onRequestClose={() => {
      setIsVisible(!isVisible);
    }}
  >
  <SafeAreaView className="flex-1">
    <View className={'flex flex-1 p-5'}>
        <View className={'flex flex-row justify-between mb-10'}>
            <Text className={'text-center text-2xl'}>Buy Product</Text>
            <TouchableOpacity onPress={()=> setIsVisible(false)}>
                <Ionicons name="close" size={30} color="#606060" />
            </TouchableOpacity>
        </View>
        <View>
            <View className={'flex flex-row justify-between items-center mb-3'}>
            <View className={'bg-green-200 rounded-full w-2/4 py-2 px-3'}>
                <Text className={'text-center'}>{selectedProduct?.category}</Text>
            </View>
            <Text className={'text-lg'}>Quantity: {selectedProduct?.quantity}</Text>
            </View>
            <View className={'flex flex-row items-center justify-between mb-3'}>
                <Text className={'text-lg'}>{selectedProduct?.name}</Text>
                <Text className={'text-lg'}>Php. {selectedProduct?.price}</Text>
            </View>
            <Text className={'mb-5'}>
                {selectedProduct?.description}
            </Text>
            {
                error && <Text className={'bg-red-400 text-white p-3 rounded-xl mb-3'}>{error}</Text>
            }
            <TextInput 
                className={'px-4 py-2 rounded-xl w-full border border-gray-100 mb-3'}
                placeholder="Quantity per Kilo" 
                value={quantity}
                onChangeText={(val)=> {
                    if(val > selectedProduct.quantity) {
                        setError(`Desired quantity is greater than quantity left.`);
                        setQuantity(val)

                    }else{
                        setQuantity(val)
                        setError("")
                    }
                }}  
                keyboardType="numeric"          
            />

            {/* 
            <TextInput 
                className={'px-4 py-2 rounded-xl w-full border border-gray-100 mb-5'}
                placeholder="Category Description"
                multiline={true}  
                value={description}
                onChangeText={setDescription}           
            /> */}
            <Text className={'mb-3 text-lg'}>Total Amount: Php. {quantity * selectedProduct?.price}</Text>
            <TouchableOpacity className={'bg-blue-500 px-4 py-3 rounded-xl mb-3'} onPress={buyHandler}>
                <Text className={'text-center text-white'}>Buy Product</Text>
            </TouchableOpacity>
            <TouchableOpacity className={'bg-gray-500 px-4 py-3 rounded-xl'} onPress={()=> {
                setIsVisible(false)
            }}>
                <Text className={'text-center text-white'}>Cancel</Text>
            </TouchableOpacity>
        </View>
    </View>
    </SafeAreaView>
  </Modal>
}