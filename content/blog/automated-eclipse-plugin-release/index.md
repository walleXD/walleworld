---
title: Automated Eclipse Plugin Release (w/ Maven)
date: "2019-05-17T19:25:03.284Z"
description: Maven is used all over and can be well integrated into an eclispe based workflow. But Maven can be a total pain. That doesn't mean Maven isn't powerful. Below lies the steps for automated updatesite & release for existing eclipse plugins built with Maven.
---

## Assumptions

![Assumption Meme!][image-1]

## Feature project

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <parent>
		<groupId>edu.cuny.hunter.log</groupId>
		<artifactId>parent</artifactId>
		<version>1.4.0-SNAPSHOT</version>
	</parent>

  <artifactId>edu.cuny.hunter.log.feature</artifactId>
  <version>1.4.0-SNAPSHOT</version>
  <packaging>eclipse-feature</packaging>
</project>
```

```bash
mvn package
```

## Update Site Project

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <parent>
		<groupId>edu.cuny.hunter.log</groupId>
		<artifactId>parent</artifactId>
		<version>1.4.0-SNAPSHOT</version>
  </parent>

  <artifactId>edu.cuny.hunter.log.updatesite</artifactId>
  <version>1.4.0-SNAPSHOT</version>
  <packaging>eclipse-repository</packaging>

</project>
```

```bash
mvn verify
```

## P2 Repo setup

```xml
<build>
  <plugins>
    <plugin>
      <groupId>org.eclipse.tycho.extras</groupId>
      <artifactId>tycho-p2-extras-plugin</artifactId>
      <version>${tycho-version}</version>
      <executions>
          <execution>
            <id>add-to-update-site</id>
            <phase>package</phase>
            <goals>
                <goal>mirror</goal>
            </goals>
            <configuration>
                <source>
                  <repository>
                      <url>${project.build.directory}/repository</url>
                  </repository>
                </source>
                <destination>./</destination>
                <append>true</append>
            </configuration>
          </execution>
      </executions>
    </plugin>
  </plugins>
</build>
```

```bash
mvn package
```

## Auto update versions

```bash
mvn -Dtycho.mode=maven org.eclipse.tycho:tycho-versions-plugin:set-version -DnewVersion=new_version-SNAPSHOT
```

```bash
mvn -Dtycho.mode=maven org.eclipse.tycho:tycho-versions-plugin:update-eclipse-metadata -DnewVersion=new_version-SNAPSHOT
```

[image-1]: ./assumption_meme.jpg
