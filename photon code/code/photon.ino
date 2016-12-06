#include "application.h"
#include "Adafruit-MotorShield-V2/Adafruit-MotorShield-V2.h"
#include "Adafruit-MotorShield-V2/Adafruit_PWMServoDriver.h"
int pubtest(String extra);
Adafruit_MotorShield AFMS = Adafruit_MotorShield(); 
Adafruit_StepperMotor *myMotor = AFMS.getStepper(200, 1);

int totalTasks = 10;

void setup() {
Particle.function("pubtest", pubtest);
  Serial.begin(9600);           // set up Serial library at 9600 bps
  AFMS.begin();  // create with the default frequency 1.6KHz
  myMotor->setSpeed(50);
}

void loop() {
    // continue forever
}

int pubtest(String extra){
    //Serial.println(extra);
    int incompleteTasks = atoi(extra);
    int completedTasks = totalTasks - incompleteTasks;
    if(completedTasks % 3 == 0){
        for (int i = 0; i< 4; i++){
        myMotor->step(50, FORWARD, DOUBLE);
        delay(1000);
        }
        
    }
   return 0; 
}

