#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include <iomanip>
#include "../include/nlohmann/json.hpp"
#include "../include/hash/md5.h"
#include "../include/hash/sha256.h"
using namespace std;
using json = nlohmann::json;

const string PATH = "/Volumes/PSSD/sementicscholar_data_processed/";
const string PATH_TO = "/Volumes/PSSD/sementicscholar_data_hashed/";
int NUM = 6000;

string hashing(string msg)
{
  return sha256(msg);
}
string getFileName(int i)
{
  stringstream ss;
  ss << "corpus-" << setw(4) << setfill('0') << i;
  return ss.str();
}
string toString(string id, string hashedTitle)
{
  stringstream ss;
  ss << id << "," << hashedTitle << "\n";
  return ss.str();
}
int main()
{
  for (int i = 0; i < NUM; ++i)
  {
    string fileName = PATH + getFileName(i);
    string toFileName = PATH_TO + getFileName(i);
    cout << fileName << endl;

    ifstream jsonFile(fileName);
    json corpus;
    jsonFile >> corpus;
    jsonFile.close();

    string csv = "id,hashed_title\n";

    for (int j = 0; j < corpus.size(); ++j)
    {
      string id = corpus[j]["id"];
      string title = corpus[j]["title"];

      string hashedTitle = hashing(title);

      csv += toString(id, hashedTitle);
    }

    ofstream hashedCorpus(toFileName);
    hashedCorpus << csv;
    hashedCorpus.close();
  }
  return 0;
}