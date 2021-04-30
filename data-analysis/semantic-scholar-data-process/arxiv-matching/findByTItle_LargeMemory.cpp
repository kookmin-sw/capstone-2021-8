#include <iostream>
#include <vector>
#include <map>
#include <fstream>
#include <string>
#include <sstream>
#include "hash/sha256.h"
#include "csv/parser.hpp"
using namespace std;

const string ARXIV_CSV = "/Users/sang-geon/git_reps/paperCrawling/arxiv_csv/2020.csv";
const string MATCH_CSV = "/Users/sang-geon/git_reps/paperCrawling/arxiv_csv/match.csv";
const string PATH = "/Volumes/PSSD/sementicscholar_data_hashed/";
int NUM = 6000;

struct PaperStruct {
  string paperId;
  int fileIdx;
};

string hashing(string msg){
  return sha256(msg);
}
string getFileName(int i){
  stringstream ss;
  ss << "corpus-" << setw(4) << setfill('0') << i;
  return ss.str();
}
int main(){
  map<string, vector<PaperStruct>> hashedTitleToIds;

  for(int i = 0; i < NUM; ++i){
    string fileName = PATH + getFileName(i);
    cout << fileName << endl;
    ifstream hashedCSV(fileName);
    aria::csv::CsvParser parser(hashedCSV);

    bool flag = true;
    for(const vector<string>& row : parser){
      if(flag){ // ignore first row
        flag = false;
        continue;
      }
      string id = row[0];
      string hashedTitle = row[1];

      hashedTitleToIds[hashedTitle].push_back({id, i});
    }

    cout << hashedTitleToIds.size() << endl;
  }

  int found = 0, notFound = 0;
  string matchedCSV = "arxiv_num,matched_papers\n";
  // arxivNum,fileidx1:paperid1/fileidx2:paperid2/
  vector<vector<PaperStruct>> matchedPapers;

  ifstream arxivCSV(ARXIV_CSV);
  // abstract, arxiv_num, authors, pdf_url, primary_subject, publication_date, save_path, secondary_subjects, title
  aria::csv::CsvParser parser(arxivCSV);
  bool flag = true;
  for(const vector<string>& row : parser){
    if(flag){ // ignore first row
      flag = false;
      continue;
    }
    string title = row[8];
    string arxivNum = row[1];

    matchedCSV += arxivNum;

    string hashedTitle = hashing(title);

    if(hashedTitleToIds.find(hashedTitle) == hashedTitleToIds.end()){
      ++notFound;
      continue;
    }else ++found;

    vector<PaperStruct>& papers = hashedTitleToIds[hashedTitle];

    string papersStr = "\"";

    for(PaperStruct& paper : papers){
      string str = to_string(paper.fileIdx);
      str += ":";
      str += paper.paperId;
      str += "/";

      papersStr += str;
    }
    papersStr += "\"";

    matchedCSV += papersStr;
    matchedCSV += "\n";

    matchedPapers.push_back(papers);
  }
  cout << "Total = " << found + notFound << "\nFound = " << found << "\nNot Found = " << notFound << endl;

  ofstream matchedCSVFile(MATCH_CSV);
  matchedCSVFile << matchedCSV;
  matchedCSVFile.close();

  return 0;
}