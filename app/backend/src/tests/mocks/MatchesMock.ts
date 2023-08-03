const matchesMock = 
    [
        {
          "id": 1,
          "homeTeamId": 16,
          "homeTeamGoals": 1,
          "awayTeamId": 8,
          "awayTeamGoals": 1,
          "inProgress": false,
          "homeTeam": {
            "teamName": "São Paulo"
          },
          "awayTeam": {
            "teamName": "Grêmio"
          }
        },
        {
          "id": 2,
          "homeTeamId": 9,
          "homeTeamGoals": 1,
          "awayTeamId": 14,
          "awayTeamGoals": 1,
          "inProgress": false,
          "homeTeam": {
            "teamName": "Internacional"
          },
          "awayTeam": {
            "teamName": "Santos"
          }
        },
        {
          "id": 3,
          "homeTeamId": 4,
          "homeTeamGoals": 3,
          "awayTeamId": 11,
          "awayTeamGoals": 0,
          "inProgress": false,
          "homeTeam": {
            "teamName": "Corinthians"
          },
          "awayTeam": {
            "teamName": "Napoli-SC"
          }
        },
        {
          "id": 4,
          "homeTeamId": 3,
          "homeTeamGoals": 0,
          "awayTeamId": 2,
          "awayTeamGoals": 0,
          "inProgress": false,
          "homeTeam": {
            "teamName": "Botafogo"
          },
          "awayTeam": {
            "teamName": "Bahia"
          }
        },
        {
          "id": 5,
          "homeTeamId": 7,
          "homeTeamGoals": 1,
          "awayTeamId": 10,
          "awayTeamGoals": 1,
          "inProgress": false,
          "homeTeam": {
            "teamName": "Flamengo"
          },
          "awayTeam": {
            "teamName": "Minas Brasília"
          }
        },
        {
          "id": 6,
          "homeTeamId": 5,
          "homeTeamGoals": 1,
          "awayTeamId": 13,
          "awayTeamGoals": 1,
          "inProgress": false,
          "homeTeam": {
            "teamName": "Cruzeiro"
          },
          "awayTeam": {
            "teamName": "Real Brasília"
          }
        },
      ]

      const finishedMatchesMock = [
        {
          "id": 1,
          "homeTeamId": 16,
          "homeTeamGoals": 1,
          "awayTeamId": 8,
          "awayTeamGoals": 1,
          "inProgress": false,
          "homeTeam": {
            "teamName": "São Paulo"
          },
          "awayTeam": {
            "teamName": "Grêmio"
          }
        },
        {
          "id": 2,
          "homeTeamId": 9,
          "homeTeamGoals": 1,
          "awayTeamId": 14,
          "awayTeamGoals": 1,
          "inProgress": false,
          "homeTeam": {
            "teamName": "Internacional"
          },
          "awayTeam": {
            "teamName": "Santos"
          }
        }
      ]

      const matchesInProgressMock = [
        {
          "id": 41,
          "homeTeamId": 16,
          "homeTeamGoals": 2,
          "awayTeamId": 9,
          "awayTeamGoals": 0,
          "inProgress": true,
          "homeTeam": {
            "teamName": "São Paulo"
          },
          "awayTeam": {
            "teamName": "Internacional"
          }
        },
        {
          "id": 42,
          "homeTeamId": 6,
          "homeTeamGoals": 1,
          "awayTeamId": 1,
          "awayTeamGoals": 0,
          "inProgress": true,
          "homeTeam": {
            "teamName": "Ferroviária"
          },
          "awayTeam": {
            "teamName": "Avaí/Kindermann"
          }
        }
      ]

      const matchToBeFinished = {
        id: 1,
        home_team_id: 1,
        home_team_goals: 1,
        away_team_id: 2,
        away_team_goals: 0,
        in_progress: false,
      };

      const updateMatchBody = {
        homeTeamGoals: 3,
        awayTeamGoals: 1,
      }

      const matchToBeUpdated = {
        id: 1,
        home_team_id: 1,
        home_team_goals: 2,
        away_team_id: 2,
        away_team_goals: 1,
        in_progress: false,
      };

      const matchToBeCreated = {
        id: 1,
        home_team_id: 3,
        home_team_goals: 3,
        away_team_id: 1,
        away_team_goals: 1,
        in_progress: false,
      };

      const bodyForMatchCreate = {
        homeTeamId: 5,
        awayTeamId: 10,
        homeTeamGoals: 1,
        awayTeamGoals: 3,
      }

      const invalidBody = {
        homeTeamId: 2,
        awayTeamId: 2,
        homeTeamGoals: 1,
        awayTeamGoals: 1,
      }

      const bodyWithNonExistentTeam = {
        homeTeamId: 17,
        awayTeamId: 3,
        homeTeamGoals: 2,
        awayTeamGoals: 1,
      };

      export { matchesMock, finishedMatchesMock, matchesInProgressMock, matchToBeFinished,
         updateMatchBody, matchToBeUpdated, matchToBeCreated, bodyForMatchCreate, invalidBody, bodyWithNonExistentTeam };
