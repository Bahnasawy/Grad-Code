import keras

model = keras.models.load_model("model.h5")

model.predict("Hello, World")