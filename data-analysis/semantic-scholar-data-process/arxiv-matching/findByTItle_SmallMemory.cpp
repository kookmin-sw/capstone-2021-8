#include <iostream>
#include <algorithm>
#include <vector>
#include <set>
#include <map>
#include <fstream>
#include <string>
#include <sstream>
#include "hash/sha256.h"
#include "csv/parser.hpp"
using namespace std;

const string ARXIV_CSV = "/Users/sang-geon/git_reps/paperCrawling/arxiv_csv/2010~13년초반.csv";
const string MATCH_CSV = "/Users/sang-geon/git_reps/paperCrawling/arxiv_csv/match.csv";
const string PATH = "/Volumes/PSSD/sementicscholar_data_hashed/";
int NUM = 6000;

struct PaperStruct {
  string paperId;
  string hashedTitle;
  int fileIdx;
};
struct ArxivPaper {
  string title;
  string arxivNum;
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
  cout << "fetching arxiv papers ..." << endl;

  vector<ArxivPaper> arxivPapers;

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

    arxivPapers.push_back({title, arxivNum});
  }

  cout << "indexing fetched arxiv papers ..." << endl;

  map<string, vector<ArxivPaper>> indexedArxivPapers;
  set<string> arxivTitleHashes;
  for(ArxivPaper& paper: arxivPapers){
    string hashedTitle = hashing(paper.title);
    arxivTitleHashes.insert(hashedTitle);
    indexedArxivPapers[hashedTitle].push_back(paper);
  }
  int tot = 0, cnt = 0, totConflict = 0, maxConflicts = 0;
  for(auto itr = indexedArxivPapers.begin(); itr != indexedArxivPapers.end(); ++itr){
    ++tot;
    if((itr->second).size() > 1){
      ++cnt;
      totConflict += (itr->second).size();
      maxConflicts = max(maxConflicts, (int)(itr->second).size());
    }
  }
  cout << cnt << "/" << tot << endl;
  cout << (double)totConflict / cnt << endl;
  cout << maxConflicts << endl;
  
  cout << "streaming large paper set to find candidate papers ..." << endl;

  vector<PaperStruct> candidatePapers;

  for(int i = 0; i < NUM; ++i){
    string fileName = PATH + getFileName(i);
    ifstream hashedCSV(fileName);
    aria::csv::CsvParser parser(hashedCSV);

    bool flag2 = true;
    for(const vector<string>& row: parser){
      if(flag2){ // ignore first row
        flag2 = false;
        continue;
      }
      string id = row[0];
      string hashedTitle = row[1];

      if(arxivTitleHashes.find(hashedTitle) != arxivTitleHashes.end()){
        candidatePapers.push_back({id, hashedTitle, i});
      }
    }

    cout << fileName << " : " << candidatePapers.size() << endl;
  }

  cout << "matching papers ..." << endl;

  map<string, vector<PaperStruct>> indexedCandidatePapers;

  for(PaperStruct paper: candidatePapers){
    indexedCandidatePapers[paper.hashedTitle].push_back(paper);
  }

  int foundCnt = 0, notFoundCnt = 0;
  string matchedCSV = "arxiv_num,matched_papers\n";
  // arxivNum,fileidx1:paperid1/fileidx2:paperid2/

  for(int j = 0; j < arxivPapers.size(); ++j){
    ArxivPaper& arxivPaper = arxivPapers[j];

    string title = arxivPaper.title;
    string arxivNum = arxivPaper.arxivNum;

    matchedCSV += arxivNum;
    matchedCSV += ",";

    string hashedTitle = hashing(title);

    bool found = false;
    vector<PaperStruct> matchedPapers;
    if(indexedCandidatePapers.find(hashedTitle) != indexedCandidatePapers.end()){
      found = true;
      matchedPapers = indexedCandidatePapers[hashedTitle];
    }

    if(found) ++foundCnt;
    else ++notFoundCnt;

    string papersStr = "\"";

    for(PaperStruct& paper : matchedPapers){
      string str = to_string(paper.fileIdx);
      str += ":";
      str += paper.paperId;
      str += "/";

      papersStr += str;
    }
    papersStr += "\"";

    matchedCSV += papersStr;
    matchedCSV += "\n";
  }
  cout << "Total = " << foundCnt + notFoundCnt << "\nFound = " << foundCnt << "\nNot Found = " << notFoundCnt << endl;

  ofstream matchedCSVFile(MATCH_CSV);
  matchedCSVFile << matchedCSV;
  matchedCSVFile.close();

  return 0;
}