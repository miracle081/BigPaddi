const selectImage = async () => {
    let result = await ImagePicer.launchImageLibraryAsync({
        mediaType: ImagePicer.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
    });
    if (!result.canceled) {
        const { uri, type } = result.assets[0]
        if (type === 'image') {
            setImage(uri)
            setpreVisibility(true)
        }
        else {
            Alert.alert("File", "Can't select this type of file.")
            setImage(null)
            setpreVisibility(false)
        }
    }
}

async function uplaod() {
    try {
        let response = await fetch(image);
        const imageBlob = await response.blob()
        await imgStorage().ref().child(`ProfileImages/${userUID}`).put(imageBlob);
    } catch {
        setPreloader(false)
        Alert.alert(
            "Upload Status",
            "Failed to upload profile image. Please try again",
            [{ text: 'OK' }]
        )
    }
}

async function fetchProfilePic() {
    const reference = ref(storage, `ProfileImages/${userUID}`);
    await getDownloadURL(reference).then(x => {
        updateDoc(doc(db, "users", userUID), {
            image: x
        }).then(() => {
            Alert.alert(
                "Profile Image uploaded",
                "Your profile picture has been uploaded successfully!",
            );
            setPreloader(false)
        })
            .catch(() => {
                Alert.alert(
                    "Upload Status",
                    "Failed to update profile image. Please try again",
                )
                setPreloader(false);
            })
    }).catch(() => {
        setPreloader(false);
    })
}

const uploadImage = async () => {
    setpreVisibility(false);
    setPreloader(true);
    uplaod()
        .then(() => {
            fetchProfilePic()
        }).catch(() => {
            setPreloader(false);
        })
}