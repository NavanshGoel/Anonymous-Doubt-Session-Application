# -*- coding: utf-8 -*-
"""
Created on Sat Mar 20 01:43:31 2021

@author: Tejaswi
"""

# Python program to translate 

import speech_recognition as sr 
from google_trans_new import google_translator 
 
r = sr.Recognizer() 
translator=google_translator()
'''def SpeakText(command): 
	# Initialize the engine 
	engine = pyttsx3.init() 
	engine.say(command) 
	engine.runAndWait() 
'''

def trans(x):
    result= translator.translate(x, lang_src=s, lang_tgt=d)
    return result


while(1):	  
    try:
        with sr.Microphone() as source2: 
                r.adjust_for_ambient_noise(source2, duration=0.2)  
                audio2 = r.listen(source2)
                MyText=r.recognize_google(audio2) 
                MyText.lower() 
                print("Did you say "+MyText)
                s=input('Enter your language:')
                d=input('Enter language of the teacher:')
                print(trans(MyText))
    except sr.RequestError as e: 
        print("Could not request results; {0}".format(e)) 
    except sr.UnknownValueError: 
        print("unknown error occured") 
