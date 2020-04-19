// Pipeline workflow ref: https://jenkins.io/doc/book/resources/pipeline/realworld-pipeline-flow.png
node {
  def var_main_artifact = "${env.BUILD_TAG}_build.tar.gz"
  stage('Welcome') {
    echo "[xxxxx] Running Job: ${JOB_NAME}"
    echo " - Build Number: ${env.BUILD_NUMBER}"
    echo " - Workspace(PWD): ${env.WORKSPACE}"
    echo " - Jenkins URL: ${env.JENKINS_URL}"
  }
  try {
    stage('代码获取 SCM Checkout') {
      // checkout scm
      checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/neozxin/cra-applib0.git']]])
    }
    stage('安装依赖 Collect Dependencies') {
      // .withRun('-p 8081:8081 -p 8080:8080') { c ->
      docker.image('node:12.16.1').inside('--net=host') {
        sh "npm install"
      }
    }
    stage('构建内容 Build') {
      parallel 'Build Package': {
        docker.image('node:12.16.1').inside('--net=host') {
          sh "npm run build && tar -czf - ./build | cat > './${var_main_artifact}'"
          // sh "ssh '${ENV_BUILD_SERVER_USER}@${ENV_BUILD_SERVER_HOST}' docker run -i --rm --net=host -w '${WORKSPACE}/.' --volumes-from 'jenkins-server' 'node:12.16.1' sh -c -- '\"'npm install '&''&' npm run build'\"'"
        }
      }, 'Unit Test': {
        docker.image('node:12.16.1').inside('--net=host') {
          sh "npm run test"
        }
      }
    }
    stage('集成测试 Test') {
      // Ref: https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker
      // def testImage = docker.build("neozxin/node12-ci", "-f 'Dockerfile_neozxin@node12-ci' './.'")
      docker.image('neozxin/node12-ci').inside {
        sh "npm run test:aat"
      }
    }
    stage('产出分发 Deliver') {
      docker.image('node:12.16.1').inside('--net=host') {
        echo "For now, there is no any"
      }
    }
  }
  catch (exc) {
    echo '[xxxxx] Something Failed'
    sh 'false'
  }
  finally {
    echo "[xxxxx] Artifacts will be stored at '${WORKSPACE}/../../jobs/${JOB_NAME}/builds/${env.BUILD_NUMBER}/'"
    archiveArtifacts artifacts: "**/${var_main_artifact}", fingerprint: true
    sh "rm -rf './${var_main_artifact}'"
    // junit "coverage/*.xml"
  }
}
