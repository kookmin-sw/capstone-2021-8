#include <iostream>
#include <fstream>
#include <string>
#include <set>
#include <sstream>
#include <iomanip>
#include "nlohmann/json.hpp"
#include "hash/md5.h"
#include "hash/sha256.h"
using namespace std;
using json = nlohmann::json;

const string PATH = "/Volumes/PSSD/sementicscholar_data_processed/";
const string PATH_TO = "/Volumes/PSSD/sementicscholar_data_cs/";
int NUM = 6000;

string hashing(string msg){
  return sha256(msg);
}
string getFileName(int i){
  stringstream ss;
  ss << "corpus-" << setw(4) << setfill('0') << i;
  return ss.str();
}
string toString(string id, string hashedTitle){
  stringstream ss;
  ss << id << "," << hashedTitle << "\n";
  return ss.str();
}
int main(){
  set<string> fieldsOfStudies;
  
  for(int i = 0; i < NUM; ++i){
    string fileName = PATH + getFileName(i);
    cout << fileName << endl;

    ifstream jsonFile(fileName);
    json corpus;
    jsonFile >> corpus;
    jsonFile.close();

    json csPapers;

    for(int j = 0; j < corpus.size(); ++j){
      string id = corpus[j]["id"];
      string title = corpus[j]["title"];
      vector<string> fieldsOfStudy = corpus[j]["fieldsOfStudy"];

      bool isCS = false;

      for(string field: fieldsOfStudy){
        if(field == "Computer Science"){
          isCS = true;
        }
        fieldsOfStudies.insert(field);
      }

      if(isCS){
        csPapers.push_back(corpus[j]);
      }
    }

    fileName = PATH_TO + getFileName(i);
    ofstream csPapersJsonFile(fileName);
    csPapersJsonFile << csPapers;

    cout << fieldsOfStudies.size() << ", " << csPapers.size() << " / " << corpus.size() << endl;
  }
  string fieldsStr = "";
  for(auto itr = fieldsOfStudies.begin(); itr != fieldsOfStudies.end(); ++itr){
    string field = (*itr);
    fieldsStr += field;
    fieldsStr += ",";
  }

  ofstream fieldsFile("./fileds.txt");
  fieldsFile << fieldsStr;
  fieldsFile.close();

  cout << fieldsStr;
  return 0;
}