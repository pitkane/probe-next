pipeline {
  agent {
    label 'docker'
  }

  options {
    timeout(time: 20, unit: 'MINUTES')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build') {
      steps {
        runCompose("-f docker-compose.yml -f compose/test.yml", "build --pull")
      }
    }

    stage('Test Components') {
      steps {
        runCompose("-f compose/test.yml", "run jest")
      }
    }

    stage('Lint') {
      steps {
        runCompose("-f compose/test.yml", "run lint")
      }
    }

    stage('Audit') {
      steps {
        runCompose("-f compose/test.yml", "run audit")
      }
    }


    stage('Deploy') {
      steps {
        runCompose("-f docker-compose.yml -f compose/test.yml", "down -v")
        runDeploy()
      }
    }
  }
/*
  post {
    always {
      // notifyBuild(currentBuild.result)
    }
  }
*/
}

def runCompose(composeFiles = "", operation = "build", setEnvironment = "") {
  sh "${setEnvironment} docker-compose -p designsystem --project-directory . ${composeFiles} ${operation}"
}

def runDeploy() {
  sh "bin/deploy.sh"
}

def notifyBuild(String buildStatus = 'STARTED') {
  buildStatus = buildStatus ?: 'SUCCESS'

  def colorCode = '#FF9FA1'
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
  def summary = "${subject} (${env.BUILD_URL})"
  def details = """<p>STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
    <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>"""

  if (buildStatus == 'STARTED') {
    colorCode = '#D4DADF'
  } else if (buildStatus == 'SUCCESS') {
    colorCode = '#BDFFC3'
  } else {
    colorCode = '#FF9FA1'
  }

  slackSend(teamDomain: "", token: "", color: colorCode, message: summary)
}
