import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import RadioButton from "../Components/Button/RadioButton";
import Custom_Input from "../Components/Input/Custom_Input";
import jobData from "../JSON/Job.json";
import Submit from "../Components/Button/Submit";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface JobDetails {
  salaryPeriod: string[];
  positionType: string[];
}

interface Job {
  jobTitle: string;
  details: JobDetails;
}

const Job_Details = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedSalaryPeriod, setSelectedSalaryPeriod] = useState<string>("");
  const [selectedPositionType, setSelectedPositionType] = useState<string>("");

  const [adTitle, setadTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Job Details Form</Text>

        <Text>Select Job Title:</Text>
        <ScrollView  showsHorizontalScrollIndicator={false}>
          {jobData.map((item: Job, index: number) => (
            <View key={index} style={styles.radioOption}>
              <RadioButton
                label={item.jobTitle}
                selected={selectedJob?.jobTitle === item.jobTitle}
                onPress={() => {
                  setSelectedJob(item);
                  setSelectedSalaryPeriod("");
                  setSelectedPositionType("");
                }}
              />
            </View>
          ))}
        </ScrollView>

        {selectedJob && (
          <>
            <Text>Select Salary Period:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedJob.details.salaryPeriod.map((period, index) => (
                <View key={index} style={styles.radioOption}>
                  <RadioButton
                    label={period}
                    selected={selectedSalaryPeriod === period}
                    onPress={() => setSelectedSalaryPeriod(period)}
                  />
                </View>
              ))}
            </ScrollView>

            <Text>Select Position Type:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedJob.details.positionType.map((type, index) => (
                <View key={index} style={styles.radioOption}>
                  <RadioButton
                    label={type}
                    selected={selectedPositionType === type}
                    onPress={() => setSelectedPositionType(type)}
                  />
                </View>
              ))}
            </ScrollView>

            <Text>Ad Title:</Text>
            <Custom_Input
              keyboardType="numeric"
              value={adTitle}
              onChangeText={(text) => setadTitle(text)}
              maxLength={30}
            />
            <Text>Description:</Text>
            <Custom_Input
              keyboardType="numeric"
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline
              maxLength={4000}
            />
          </>
        )}
      </View>
      <Submit/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: SCREEN_HEIGHT * 0.01,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  radioOption: {
    marginRight: 10,
  },
});

export default Job_Details;
